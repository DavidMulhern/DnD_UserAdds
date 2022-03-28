import React, { useState } from "react";
import TopBar from "./TopBar";
import SideMenu from "./SideMenu";

export default function Navigations( { setBackgroundImage } ) {
    // Assigning a state for the open menu.
    const [openSideMenu, setOpenSideMenu] = useState(false);
    return (
        <div> 
            {/* Passing the state to the components */}
            <TopBar setOpenSideMenu={setOpenSideMenu} />
            <SideMenu openSideMenu={openSideMenu} setOpenSideMenu={setOpenSideMenu} setNewBgImage={setBackgroundImage} />
        </div>
    );
}