import { ExpandMore } from '@mui/icons-material'
import { Accordion, AccordionDetails, AccordionSummary, Box, Container, Toolbar, Typography } from '@mui/material'
import React from 'react'

const demoFAQs = [
  {
    question: 'Client Prospecting',
    answer:
      'We also ensure that the whole team is included in the process and that no one is left out during the turnaround. The most crucial part is ensuring some degree of financial stability during the turnaround.',
  },
  {
    question: 'Website Research',
    answer:
      'We also ensure that the whole team is included in the process and that no one is left out during the turnaround. The most crucial part is ensuring some degree of financial stability during the turnaround.',
  },
  {
    question: 'Grant & Funding Research',
    answer:
      'We also ensure that the whole team is included in the process and that no one is left out during the turnaround. The most crucial part is ensuring some degree of financial stability during the turnaround.',
  },
]

const FAQs = ({ theme, deviceType }) => {
  const [expanded, setExpanded] = React.useState(false)

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <div style={{ backgroundColor: '#F4F4F4' }}>
      <Toolbar />
      <br/>
      <Container>
        <Box display={'flex'} flexDirection={'column'} justifyContent={'start'} alignItems={'start'}>
          <Typography variant={deviceType !== 'pc' ? 'h5' : 'h2'} py={2} gutterBottom>
            Frequently Asked <span style={{ color: theme.palette.secondary.main }}> Questions </span>
          </Typography>
          <br />
          {demoFAQs.map((item, index) => (
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
                <Typography gutterBottom>{item?.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{item.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
      <Toolbar />
      <Toolbar />
    </div>
  )
}

export default FAQs
