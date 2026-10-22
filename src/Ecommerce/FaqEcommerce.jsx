import React from 'react';
import AcordeonFaq from '../utils/AcordeonFaq';
import { PREGUNTAS_ECOMMERCE } from './preguntasEcommerce';
import './FaqEcommerce.css';

const FaqEcommerce = () => <AcordeonFaq preguntas={PREGUNTAS_ECOMMERCE} prefijo="faqec" />;

export default FaqEcommerce;
