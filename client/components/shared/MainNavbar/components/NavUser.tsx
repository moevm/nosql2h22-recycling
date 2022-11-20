import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import { Button } from "react-bootstrap";
import { signIn, signOut, useSession } from "next-auth/react";

export type INavUserProps = {
    isLogged: boolean;
};

export const NavUser = ({ isLogged }: INavUserProps) => {
    const { data: session } = useSession();

    return (
        !isLogged
            ? (
                <Button
                    onClick={() => {
                        signIn("yandex");
                    }}
                    variant="outline-light"
                >
                    Log in
                </Button>
            )
            : (
                <Navbar.Text>
                    <span>
                        {session?.user?.name}
                    </span>
                    <Image
                        roundedCircle
                        height="32px"
                        style={{
                            marginLeft: "1rem",
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            signOut();
                        }}
                        src={session?.user?.image || ""}
                    />
                </Navbar.Text>
            )
    );
};
