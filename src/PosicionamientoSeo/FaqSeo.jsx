import React from 'react';
import AcordeonFaq from '../utils/AcordeonFaq';
import { PREGUNTAS_SEO } from './preguntasSeo';
import './FaqSeo.css';

const FaqSeo = () => <AcordeonFaq preguntas={PREGUNTAS_SEO} prefijo="seo" />;

export default FaqSeo;
