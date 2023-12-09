import React from 'react';
import './css/Profile.css';
import Header from './Header';

interface TokenType {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    userLocation: string;
}

interface HomeProps {
    token: TokenType;
}

const Profile: React.FC<HomeProps> = ({ token }) => {

    return (
        <div><Header />
            <div className="Container">
                <div className="profile-container">
                    {token ? (
                        <div className="user-profile">
                            <h1 className="profile-header">User Profile</h1>
                            <p className="profile-info">Username: {token.username}</p>
                            <p className="profile-info">First Name: {token.firstName}</p>
                            <p className="profile-info">Last Name: {token.lastName}</p>
                            <p className="profile-info">Location: {token.userLocation}</p>
                        </div>
                    ) : (
                        <p>Loading user profile...</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
