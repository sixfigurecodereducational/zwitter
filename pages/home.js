import { Flex, Box, Text, Input, Button } from "@chakra-ui/react";
import Zweet from "../components/Zweet";
import NavBar from "../components/NavBar";
import { useRouter } from 'next/router';
import React, { useEffect, useState } from "react";
import { getToken, isLoggedIn } from "../utils/googleToken";
import { getAllZweets, postZweet } from "../utils/zweets";

export default function Home() {
    const router = useRouter();
    const [pendingZweet, setPendingZweet] = useState("");
    const [zweets, setZweets] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const loggedIn = isLoggedIn();
            if (!loggedIn) {
                router.push('/');
            } else {
                // Grab all zweets
                const token = getToken();
                const response = await getAllZweets(token)
                setZweets(response);

            }
        }
        fetchData();
    }, [])

    const handleZweet = async (e) => {
        e.preventDefault();
        const loggedIn = isLoggedIn();
        if (!loggedIn) {
            router.push('/');
        } else {
            setIsLoading(true);
            try {
                const token = getToken();
                await postZweet(token, pendingZweet);
            } catch (error) {
                console.error(error);
            }
            setIsLoading(false);
        }
    }


    return (
        <>
            <NavBar />
            <Flex width="100vw" minH="100vh" alignItems="center" justifyContent="center" bg="yellow.800">
                <Box p={4} width="75%">
                    <Box bg="white" borderRadius="lg" boxShadow="md" p={4} mb={4}>
                        <Box p={4} mb={4}>
                            <Text mb={2} fontWeight="bold">What's happening?</Text>
                            <Flex mb={4} alignItems="center" gap="4">
                                <Box bg="gray.100" borderRadius="lg" p={2} flex="1">
                                    <Input color="gray.500" fontSize="sm" placeholder="Zweet your thoughts" value={pendingZweet} onChange={(e) => setPendingZweet(e.target.value)}></Input>
                                </Box>
                                <Button isLoading={isLoading} onClick={handleZweet}>
                                    Zweet
                                </Button>
                            </Flex>
                        </Box>
                    </Box>
                    <Box bg="white" borderRadius="lg" boxShadow="md" p={4} mb={4}>
                        <Text mb={2} fontWeight="bold">Latest Zweets</Text>
                        <Box borderRadius="lg" p={2}>
                            {zweets != null && zweets.sort(compareZweet).map((item) => (
                                <Zweet name={item.createdBy} time={new Date(item.createdOn).toLocaleString()} zweet={item.content} />
                            ))}
                        </Box>
                    </Box>
                </Box>
            </Flex>
        </>
    );
}

function compareZweet( a, b ) {
    const aDate = new Date(a.createdOn);
    const bDate = new Date(b.createdOn);
    if ( aDate > bDate ){
      return -1;
    }
    if ( aDate < bDate ){
      return 1;
    }
    return 0;
  }