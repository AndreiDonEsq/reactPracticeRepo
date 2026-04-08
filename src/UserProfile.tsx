import React, { useState } from "react";
import { type User } from "./types/user";
import { type Settings } from "./types/settings";
import WithLoadingButton from "./WithLoadingButton";

interface UserProfileProps {
    currentUser: User;
    handleUserUpdate?: (fields: Partial<User>) => void;
    sendToApIFunction?: (user: User) => void;
    theme: Settings["theme"];
}

export default function UserProfile({
    currentUser,
    handleUserUpdate,
    sendToApIFunction,
    theme,
}: UserProfileProps) {

    return (
        <div>
            <WithLoadingButton
                onClick={() => sendToApIFunction && sendToApIFunction(currentUser)}
                theme={theme}
            >
                Submit profile to external provider
            </WithLoadingButton>
            <div className="user-profile">
                <h1>{currentUser.name}</h1>
                <p className="profile-email">{currentUser.email}</p>
            </div>
            <div>
                <label htmlFor="name">Name:</label>
                <input
                    name="name"
                    type="text"
                    value={currentUser.name}
                    onChange={(e) => handleUserUpdate && handleUserUpdate({ name: e.target.value })}
                />
                <label htmlFor="email">Email:</label>
                <input
                    name="email"
                    type="email"
                    value={currentUser.email}
                    onChange={(e) => handleUserUpdate && handleUserUpdate({  email: e.target.value })}
                />
            </div>
        </div>
    );
}
