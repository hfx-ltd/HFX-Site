import { Accordion, AccordionDetails, AccordionSummary, Card, Container, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import { ExpandMore } from '@mui/icons-material';
import { faqs } from '../../data/faqs';



const FAQPage = () => {
  const theme = useTheme();
  const [deviceType, setDeviceType] = React.useState('mobile');

  const [expanded, setExpanded] = React.useState(false)
  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  const xs = useMediaQuery(theme.breakpoints.only('xs'));
  const sm = useMediaQuery(theme.breakpoints.only('sm'));

  React.useEffect(() => {
    if (xs) {
      setDeviceType('mobile');
    } else if (sm) {
      setDeviceType('tablet');
    } else {
      setDeviceType('pc');
    }
  }, [sm, xs]);

  return (
    <div style={{ backgroundColor: '#F4F4F4' }}>
      <Toolbar />
      <Toolbar />
      {deviceType === 'pc' && <Toolbar />}
      <Container>
      <Typography variant={deviceType !== 'pc' ? 'h5' : 'h2'} py={2} gutterBottom>
        Frequently Asked <span style={{ color: theme.palette.secondary.main }}> Questions </span>
      </Typography>{' '}
      </Container>
      <Container  sx={{ border: 'none', boxShadow: 'revert', p: 4 }} >
      {faqs.map((item, index) => (
            <Accordion
              defaultExpanded={index === 0}
              key={item.question}
              sx={{mt: 2}}
              expanded={expanded === `panel1${item.question}`}
              onChange={handleChange(`panel1${item.question}`)}
            >
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls={`panel1bh-content${item?.question}`}
                id={`panel1bh-header${item?.question}`}
              >
                <Typography gutterBottom fontWeight={600} >{item?.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{item.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
      </Container>
      <Toolbar />
    </div>
  );
};

export default FAQPage;
