import React from 'react'
import OjLayout from './OjLayout';
import Header from './Header';
import { useParams } from 'react-router-dom';
import axios from 'axios';



const ProblemPage = () => {
  const { pcode } = useParams();

  const token = localStorage.getItem('token');
  axios.get('', {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  })
    .then(response => console.log(response.data))
    .catch(error => console.error(error));

  return (
    <>
      <Header></Header>
      <OjLayout pcode={pcode}></OjLayout>

    </>
  )
}

export default ProblemPage