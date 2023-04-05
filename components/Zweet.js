import { Flex, Box, Text } from "@chakra-ui/react";

export default function Zweet(props) {
    return (<Flex mb={2}>
        <Box mr={4}>
            <Text fontSize="3xl" fontWeight="bold" fontFamily="'Amatic SC', cursive">Z</Text>
        </Box>
        <Box>
            <Text fontWeight="bold">{props.name}</Text>
            <Text fontSize="sm" color="gray.500">{props.time}</Text>
            <Text>
                {props.zweet}
            </Text>
        </Box>
    </Flex>);
}