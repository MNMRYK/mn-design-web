import React from 'react';
import AcordeonFaq from '../utils/AcordeonFaq';
import { PREGUNTAS_DISENO } from './preguntasDiseno';
import './FaqDiseno.css';

const FaqDiseno = () => <AcordeonFaq preguntas={PREGUNTAS_DISENO} prefijo="faq" />;

export default FaqDiseno;
