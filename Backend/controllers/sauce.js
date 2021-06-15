// Models 
const Sauce = require('../models/Sauce');

// Fs
const fs = require('fs');

// Creation
exports.createSauce = (req, res, next) => {
  const sauceObject = req.body;
  delete sauceObject._id;
  if (!sauceObject.userId || !sauceObject.name ||
    !sauceObject.manufacturer || !sauceObject.description ||
    !sauceObject.mainPepper || !sauceObject.heat ||
    !req.file.path) {
    return res.status(500).json({ error: 'Requête invalide' });
  }

  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: []
  });

  //Save
  sauce.save()
    .then(() => res.status(201).json({ message: 'La sauce a bien été crée.' }))
    .catch(error => res.status(400).json({ error }));
};

// Modification
exports.updateSauce = (req, res, next) => {

  const sauceObject = req.file ?
    {
      ...req.body,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } :
    { ...req.body };
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'La sauce a bien été modifié !' }))
    .catch(error => res.status(400).json({ error }));
}

// Delete
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`/images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'La sauce a bien été supprimé !' }))
          .catch(error => res.status(400).json({ error }));
      })
    })
    .catch(error => res.status(400).json({ error }));
}

// Get all
exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
}

// Get one
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
}

//Likes & Dislikes
exports.saucesStatues = (req, res, next) => {
  const userId = req.body.userId;
  const likeState = req.body.like;

  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {

      switch (likeState) {

        case 1:

          if (!sauce.usersLiked.includes(userId)) {

            Sauce.updateOne({ _id: req.params.id }, { $inc: { likes: +1 }, $push: { usersLiked: userId } })
              .then(() => res.status(200).json({ message: 'Like choisi !' }))
              .catch(error => res.status(400).json({ error }));
          }
          break;

        case -1:
          if (!sauce.usersDisliked.includes(userId)) {
            
          Sauce.updateOne({ _id: req.params.id }, { $inc: { dislikes: +1 }, $push: { usersDisliked: userId } })
            .then(() => res.status(200).json({ message: 'Dislike choisi !' }))
            .catch(error => res.status(400).json({ error }));
          }
          break;

        case 0:

          if (sauce.usersDisliked.includes(userId)) {
            Sauce.updateOne({ _id: req.params.id }, { $inc: { dislikes: -1 }, $pull: { usersDisliked: userId } })
              .then(() => res.status(200).json({ message: 'Dislike et nom supprimés !' }))
              .catch(error => res.status(400).json({ error }));
          } else {
            Sauce.updateOne({ _id: req.params.id }, { $inc: { likes: -1 }, $pull: { usersLiked: userId } })
              .then(() => res.status(200).json({ message: 'Like et nom supprimés !' }))
              .catch(error => res.status(400).json({ error }));
          }
          break;
      }
    })
    .catch(error => res.status(404).json({ error }));
}