import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
// material
import { CssBaseline } from '@mui/material';
import { ThemeProvider as MUIThemeProvider, createTheme, StyledEngineProvider } from '@mui/material/styles';
//
import palette from './palette';
import typography from './typography';
import componentsOverride from './overrides';
import shadows, { customShadows } from './shadows';

// ----------------------------------------------------------------------

ThemeProvider.propTypes = {
  children: PropTypes.node,
};

export default function ThemeProvider({ children }) {
  const { themeMode } = useSelector((state) => state.lifeCycle);

  const shadowColor = themeMode === 'dark' ? '#000' : '#335';

  const themeOptions = useMemo(
    () => ({
      palette: {
        ...palette(themeMode),
        mode: themeMode,
      },
      shape: { borderRadius: 8 },
      typography,
      shadows: shadows(shadowColor),
      customShadows: customShadows(shadowColor, palette(themeMode)),
    }),
    [themeMode]
  );

  const theme = createTheme(themeOptions);
  theme.components = componentsOverride(theme);

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}
