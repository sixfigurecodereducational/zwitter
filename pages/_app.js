import React from 'react';
import { ThemeProvider, CSSReset } from "@chakra-ui/react";
import { theme } from "@chakra-ui/theme";

export default function MyApp({ Component, pageProps }) {
    return (
        <ThemeProvider theme={theme}>
            <CSSReset />
            <Component {...pageProps} />
        </ThemeProvider>
    )
}