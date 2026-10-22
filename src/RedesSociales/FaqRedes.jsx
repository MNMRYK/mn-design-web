import React from 'react';
import AcordeonFaq from '../utils/AcordeonFaq';
import { PREGUNTAS_REDES } from './preguntasRedes';
import './FaqRedes.css';

const FaqRedes = () => <AcordeonFaq preguntas={PREGUNTAS_REDES} prefijo="redes" />;

export default FaqRedes;
