import NextLink from "next/link";
import { Flex, Menu, MenuItem, MenuList, MenuButton, IconButton } from "@chakra-ui/react";
import { FiSettings, FiLogOut, FiMenu } from "react-icons/fi";
import { useRouter } from 'next/router';
import { deleteToken } from "../utils/googleToken";


function NavBar() {
    return (
        <Flex
            as="nav"
            align="center"
            justify="space-between"
            wrap="wrap"
            padding={1}
            bg="white"
            color="yellow.800"
            position="relative"
            border="1px"
            borderColor="black"
            top={0}
            zIndex={1}
        >
            <NextLink href="/">
                Home
            </NextLink>
            <IconDropdownMenu />
        </Flex>
    )
}

function IconDropdownMenu() {
    const router = useRouter();

    const handleLogout = () => {
        deleteToken();
        router.push('/');
    }
    return (
        <Menu>
            <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<FiMenu />}
                variant="ghost"
            />
            <MenuList>
                <MenuItem icon={<FiSettings />} command="⌘,">
                    Settings
                </MenuItem>
                <MenuItem onClick={handleLogout} icon={<FiLogOut />} command="⌘Q">
                    Logout
                </MenuItem>
            </MenuList>
        </Menu>
    );
}

export default NavBar;