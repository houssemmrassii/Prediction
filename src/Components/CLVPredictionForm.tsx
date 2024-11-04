import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button } from '@mui/material';
import { db } from '../FirebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import './PredictionForm.css';

interface FormData {
  nb_jours_abonne: number;
  duree_appel_jour: number;
  nb_appel_jour: number;
  cout_appel_jour: number;
  duree_appel_soiree: number;
  nb_appel_soiree: number;
  cout_appel_soiree: number;
  duree_appel_nuit: number;
  nb_appel_nuit: number;
  cout_appel_nuit: number;
  duree_appel_inter: number;
  nb_appel_inter: number;
  cout_appel_inter: number;
}

const CLVPredictionForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    nb_jours_abonne: 0,
    duree_appel_jour: 0.0,
    nb_appel_jour: 0,
    cout_appel_jour: 0.0,
    duree_appel_soiree: 0.0,
    nb_appel_soiree: 0,
    cout_appel_soiree: 0.0,
    duree_appel_nuit: 0.0,
    nb_appel_nuit: 0,
    cout_appel_nuit: 0.0,
    duree_appel_inter: 0.0,
    nb_appel_inter: 0,
    cout_appel_inter: 0.0,
  });

  const [prediction, setPrediction] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Check if the field is one of the integer fields
    const intFields = ['nb_jours_abonne', 'nb_appel_jour', 'nb_appel_soiree', 'nb_appel_nuit', 'nb_appel_inter'];
    setFormData({
      ...formData,
      [name]: intFields.includes(name) ? parseInt(value) : parseFloat(value),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const features = [
      formData.nb_jours_abonne,
      formData.duree_appel_jour,
      formData.nb_appel_jour,
      formData.cout_appel_jour,
      formData.duree_appel_soiree,
      formData.nb_appel_soiree,
      formData.cout_appel_soiree,
      formData.duree_appel_nuit,
      formData.nb_appel_nuit,
      formData.cout_appel_nuit,
      formData.duree_appel_inter,
      formData.nb_appel_inter,
      formData.cout_appel_inter,
    ];

    try {
      const response = await axios.post('http://127.0.0.1:5000/predict-clv', { features });
      const predictionResult = response.data.prediction;

      setPrediction(predictionResult);

      // Save user input and prediction to Firestore
      await addDoc(collection(db, 'clv_predictions'), {
        ...formData,
        prediction: predictionResult,
        timestamp: new Date(),
      });

      console.log('CLV prediction data successfully saved to Firestore');
    } catch (error) {
      console.error('Error during CLV prediction request:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Customer Lifetime Value Prediction</h1>
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
            type="number" // Ensures it's an integer input
          />
          <TextField
            label="Day Call Duration (min)"
            variant="outlined"
            name="duree_appel_jour"
            value={formData.duree_appel_jour}
            onChange={handleChange}
            fullWidth
            size="small"
            margin="normal"
            type="number" // Ensures it's a float input
          />
        </div>
        <div className="form-row">
          <TextField
            label="Number of Day Calls"
            variant="outlined"
            name="nb_appel_jour"
            value={formData.nb_appel_jour}
            onChange={handleChange}
            fullWidth
            size="small"
            margin="normal"
            type="number" // Integer field
          />
          <TextField
            label="Day Call Cost"
            variant="outlined"
            name="cout_appel_jour"
            value={formData.cout_appel_jour}
            onChange={handleChange}
            fullWidth
            size="small"
            margin="normal"
            type="number" // Float field
          />
        </div>
        <div className="form-row">
          <TextField
            label="Evening Call Duration (min)"
            variant="outlined"
            name="duree_appel_soiree"
            value={formData.duree_appel_soiree}
            onChange={handleChange}
            fullWidth
            size="small"
            margin="normal"
            type="number" // Float field
          />
          <TextField
            label="Number of Evening Calls"
            variant="outlined"
            name="nb_appel_soiree"
            value={formData.nb_appel_soiree}
            onChange={handleChange}
            fullWidth
            size="small"
            margin="normal"
            type="number" // Integer field
          />
        </div>
        <div className="form-row">
          <TextField
            label="Evening Call Cost"
            variant="outlined"
            name="cout_appel_soiree"
            value={formData.cout_appel_soiree}
            onChange={handleChange}
            fullWidth
            size="small"
            margin="normal"
            type="number" // Float field
          />
          <TextField
            label="Night Call Duration (min)"
            variant="outlined"
            name="duree_appel_nuit"
            value={formData.duree_appel_nuit}
            onChange={handleChange}
            fullWidth
            size="small"
            margin="normal"
            type="number" // Float field
          />
        </div>
        <div className="form-row">
          <TextField
            label="Number of Night Calls"
            variant="outlined"
            name="nb_appel_nuit"
            value={formData.nb_appel_nuit}
            onChange={handleChange}
            fullWidth
            size="small"
            margin="normal"
            type="number" // Integer field
          />
          <TextField
            label="Night Call Cost"
            variant="outlined"
            name="cout_appel_nuit"
            value={formData.cout_appel_nuit}
            onChange={handleChange}
            fullWidth
            size="small"
            margin="normal"
            type="number" // Float field
          />
        </div>
        <div className="form-row">
          <TextField
            label="International Call Duration (min)"
            variant="outlined"
            name="duree_appel_inter"
            value={formData.duree_appel_inter}
            onChange={handleChange}
            fullWidth
            size="small"
            margin="normal"
            type="number" // Float field
          />
          <TextField
            label="Number of International Calls"
            variant="outlined"
            name="nb_appel_inter"
            value={formData.nb_appel_inter}
            onChange={handleChange}
            fullWidth
            size="small"
            margin="normal"
            type="number" // Integer field
          />
        </div>
        <div className="form-row">
          <TextField
            label="International Call Cost"
            variant="outlined"
            name="cout_appel_inter"
            value={formData.cout_appel_inter}
            onChange={handleChange}
            fullWidth
            size="small"
            margin="normal"
            type="number" // Float field
          />
        </div>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          className="form-button"
          fullWidth
        >
          {loading ? 'Predicting...' : 'Predict CLV'}
        </Button>
      </form>
      {prediction !== null && (
        <div className="prediction-result">
          <h2>Result: {prediction}</h2>
        </div>
      )}
    </div>
  );
};

export default CLVPredictionForm;
