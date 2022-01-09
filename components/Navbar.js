import {
  Box,
  Flex,
  Button,
  Stack,
  useColorModeValue,
  Container,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { useWallet } from "use-wallet";
import NextLink from "next/link";
import { useEffect } from "react";
import DarkModeSwitch from "./DarkModeSwitch";
import { ChevronDownIcon } from "@chakra-ui/icons";
import Image from 'next/image';

export default function NavBar() {

  const wallet = useWallet();


  return (
    <Box>
      <Flex
        color={useColorModeValue("gray.600", "white")}
        py={{ base: 2 }}
        px={{ base: 2 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
        pos="fixed"
        top="0"
        w={"full"}
        minH={"60px"}
        boxShadow={"sm"}
        zIndex="999"
        justify={"center"}
        css={{
          backdropFilter: "saturate(180%) blur(5px)",
          backgroundColor: useColorModeValue(
            "rgba(255, 255, 255, 0.8)",
            "rgba(30, 33, 45, 0.8)"
          ),
        }}
      >
        <Container as={Flex} maxW={"7xl"} align={"center"}>
          <Flex flex={{ base: 1 }} justify="start" ml={{ base: -2, md: 0 }}>
            <Heading
              textAlign="left"
              fontFamily={"heading"}
              color={useColorModeValue("purple.800", "white")}
              as="h2"
              size="lg"
            >
              <NextLink href="/">
                <Box
                  as={"span"}
                  position={"relative"}
                  zIndex={10}
                  cursor={"pointer"}
                >
                  <Image src="/logo.svg" width="150" height="70" />
                </Box>
              </NextLink>
            </Heading>
          </Flex>
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={"flex-end"}
            direction={"row"}
            spacing={6}
            display={{ base: "none", md: "flex" }}
          >
            <Button
              fontSize={"md"}
              fontWeight={600}
              variant={"link"}
              display={{ base: "none", md: "inline-flex" }}
            >
              <NextLink href="/campaign/new">Create Campaign</NextLink>
            </Button>
            <Button
              fontSize={"md"}
              fontWeight={600}
              variant={"link"}
              display={{ base: "none", md: "inline-flex" }}
            >
              <NextLink href="/#howitworks"> How it Works</NextLink>
            </Button>

            {wallet.status === "connected" ? (
              <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                  {wallet.account.substr(0, 20) + "..."}
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => wallet.reset()}>
                    Disconnect Wallet
                  </MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <div>
                <Button
                  display={{ base: "none", md: "inline-flex" }}
                  fontSize={"md"}
                  fontWeight={600}
                  color={"white"}
                  bg={"purple.400"}
                  href={"#"}
                  _hover={{
                    bg: "purple.300",
                  }}
                  onClick={() => wallet.connect()}
                >
                  Connect Wallet
                </Button>
              </div>
            )}

            <DarkModeSwitch />
          </Stack>

          <Flex display={{ base: "flex", md: "none" }}>
            <DarkModeSwitch />
          </Flex>
        </Container>
      </Flex>
    </Box>
  );
}
