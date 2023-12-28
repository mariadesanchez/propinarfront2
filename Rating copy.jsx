/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './Rating.css'; // Archivo CSS para estilos adicionales
import { Check } from '@mui/icons-material';
import Checkout from './Checkout';

const Rating = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [date] = useState(new Date().toLocaleDateString());
  const [comments, setComments] = useState([]);

  // Array de comentarios preexistentes
  const preexistingComments = [
    { rating: 5, comment: '¡Excelente servicio!', date: '2023-01-01' },
    { rating: 4, comment: 'Muy buen trato.', date: '2023-01-05' },
    { rating: 3.5, comment: 'Regular, podrían mejorar.', date: '2023-01-10' },
    // Puedes agregar más comentarios según sea necesario
  ];

  // Obtener comentarios almacenados en localStorage al cargar el componente
  useEffect(() => {
    const storedComments = JSON.parse(localStorage.getItem('comments')) || [];
    setComments([...preexistingComments, ...storedComments]);
  }, []);

  // Actualizar localStorage cuando cambien los comentarios
  useEffect(() => {
    localStorage.setItem('comments', JSON.stringify(comments));
  }, [comments]);

  const handleStarClick = (value) => {
    setRating(value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleCommentSubmit = () => {
    const newComment = { rating, comment, date };
    setComments([...comments, newComment]);
    // Limpiar el formulario después de enviar el comentario
    setRating(0);
    setComment('');
    <Checkout/>
  };

  const renderStars = (ratingValue) => {
    const stars = [];
    const maxStars = 5;

    for (let i = 1; i <= maxStars; i++) {
      stars.push(
        <IconButton
          key={i}
          color="primary" // Cambiar el color de las estrellas a azul
          onClick={() => handleStarClick(i)}
          className="star-icon" // Clase para estilizar las estrellas
        >
          {i <= ratingValue ? (
            <StarIcon />
          ) : i - 0.5 === ratingValue ? (
            <StarHalfIcon />
          ) : (
            <StarBorderIcon />
          )}
        </IconButton>
      );
    }
    return (
      <Box display="flex" alignItems="center">
        {stars}
        <Typography variant="body1">{ratingValue}/5</Typography>
      </Box>
    );
  };

  const renderComments = () => {
    return comments.map((comment, index) => (
      <div key={index} className="comment">
        {renderStars(comment.rating)}
        <Typography variant="body2" className="date">{comment.date}</Typography>
        <p>{comment.comment}</p>
      </div>
    ));
  };

  return (
    <div className="rating-container">
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        {/* Coloca aquí la imagen y el texto */}
        <img
          src="../images/AvatarLucky.png"
          alt="AvatarLucky"
          className="avatar-image" 
          style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '10px' }}
        />
        <div style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif', fontSize: '16px' }}>
          <p>Deseas Calificar a Lucky Snchz?</p>
        </div>
      </div>
      {renderStars(rating)}
      <p>{date}</p>
      <TextField
        label="Comentario"
        multiline
        rows={3}
        value={comment}
        onChange={handleCommentChange}
        style={{ margin: '10px 0', width: '100%' }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleCommentSubmit}
        className="submit-button" // Clase para estilizar el botón
      >
        Enviar Comentario
      </Button>
      <div className="comments-container">{renderComments()}</div>
    </div>
  );
};

export default Rating;
