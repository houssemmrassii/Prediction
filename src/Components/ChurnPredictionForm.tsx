import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, MenuItem } from '@mui/material';
import { db } from '../FirebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import './PredictionForm.css';

interface FormData {
  nb_jours_abonne: string;
  nb_reclamation: string;
  nb_msg_vocaux: string;
  activer_option_msg_vocaux: 'Oui' | 'Non';
}

const ChurnPredictionForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    nb_jours_abonne: '',
    nb_reclamation: '',
    nb_msg_vocaux: '',
    activer_option_msg_vocaux: 'Non',
  });

  const [prediction, setPrediction] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const features = [
      parseFloat(formData.nb_jours_abonne),
      parseFloat(formData.nb_reclamation),
      parseFloat(formData.nb_msg_vocaux),
      formData.activer_option_msg_vocaux === 'Oui' ? 1 : 0,
    ];

    try {
      const response = await axios.post('http://127.0.0.1:5000/predict-churn', { features });
      const predictionResult = response.data.prediction;

      setPrediction(predictionResult);

      // Save user input and prediction to Firestore
      await addDoc(collection(db, 'churn_predictions'), {
        ...formData,
        prediction: predictionResult,
        timestamp: new Date(),
      });

      console.log('Churn prediction data successfully saved to Firestore');
    } catch (error) {
      console.error('Error during churn prediction request:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Customer Churn Prediction</h1>
      <form onSubmit={handleSubmit} className="prediction-form">
        <div className="form-row">
          <TextField
            label="Subscription Days"
            variant="outlined"
            name="nb_jours_abonne"
            value={formData.nb_jours_abonne}
            onChange={handleChange}
            fullWidth
            size="small"
            margin="normal"
          />
          <TextField
            label="Number of Complaints"
            variant="outlined"
            name="nb_reclamation"
            value={formData.nb_reclamation}
            onChange={handleChange}
            fullWidth
            size="small"
            margin="normal"
          />
        </div>
        <div className="form-row">
          <TextField
            label="Number of Voice Messages"
            variant="outlined"
            name="nb_msg_vocaux"
            value={formData.nb_msg_vocaux}
            onChange={handleChange}
            fullWidth
            size="small"
            margin="normal"
          />
          <TextField
            select
            label="Enable Voice Message Option"
            variant="outlined"
            name="activer_option_msg_vocaux"
            value={formData.activer_option_msg_vocaux}
            onChange={handleChange}
            fullWidth
            size="small"
            margin="normal"
          >
            <MenuItem value="Non">Non</MenuItem>
            <MenuItem value="Oui">Oui</MenuItem>
          </TextField>
        </div>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          className="form-button"
          fullWidth
        >
          {loading ? 'Predicting...' : 'Predict Churn'}
        </Button>
      </form>
      {prediction !== null && (
        <div className="prediction-result">
          <h2>Result: {prediction === '1' ? 'Churned' : 'Not Churned'}</h2>
        </div>
      )}
    </div>
  );
};

export default ChurnPredictionForm;
