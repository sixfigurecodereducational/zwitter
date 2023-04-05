import React, { useEffect } from "react";
import { Flex, Image, Text } from "@chakra-ui/react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useRouter } from 'next/router';
import { saveToken, isLoggedIn } from "../utils/googleToken";

export default function LandingPage() {
  const router = useRouter();

  const onSuccess = (response) => {
    saveToken(response.credential);
    router.push('/home');
  }

  const onFailure = (error) => {
    console.error(error);
  }

  useEffect(() => {
    const loggedIn = isLoggedIn();
    if (loggedIn) {
      router.push('/home');
    }
  }, [])

  return (
    <Flex width="100vw" minH="100vh" alignItems="center" justifyContent="center" bg="yellow.800">
      <Flex p={8} bg="yellow.800" alignItems="center" justifyContent="center" color="white" borderRadisu="lg" gap="4" direction={{ base: "column", md: "row" }}>
        <Flex direction="column" alignItems="center">
          <Image src="https://ae01.alicdn.com/kf/HTB1UZxPaODxK1RjSsphq6zHrpXac/Super-New-York-City-Skyline-Clouds-backgrounds-High-quality-Computer-print-scenic-photo-backdrop.jpg_Q90.jpg_.webp" alt="Landing Image" />
          <Text mt={4} fontSize="xl" fontWeight="bold">
            Welcome to Zwitter
          </Text>
        </Flex>
        <Flex direction="column" alignItems="center">
          <GoogleOAuthProvider clientId="765604017006-g6mg7d5b3e87d0qe1b2lq51fj4umcdqs.apps.googleusercontent.com">
            <GoogleLogin
              render={({ onClick }) => (
                <Box ml={4}>
                  <button
                    bg="white"
                    onClick={onClick}
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                      alt="Google logo"
                    />
                    Log in with Google
                  </button>
                </Box>
              )}
              onSuccess={onSuccess}
              onFailure={onFailure}
            />
          </GoogleOAuthProvider>
        </Flex>
      </Flex>
    </Flex>
  )
}
