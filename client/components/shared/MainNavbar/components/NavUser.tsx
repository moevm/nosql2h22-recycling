import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import { Button } from "react-bootstrap";
import { signIn, signOut, useSession } from "next-auth/react";

export type INavUserProps = {
    onLogin: () => void;
    onLogout: () => void;
};

export const NavUser = ({ onLogin, onLogout }: INavUserProps) => {
    const { data: session } = useSession();

    return (
        !session
            ? (
                <Button
                    onClick={onLogin}
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
                        onClick={onLogout}
                        src={session?.user?.image || ""}
                    />
                </Navbar.Text>
            )
    );
};
