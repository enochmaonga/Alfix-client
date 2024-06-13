import React from "react";
import Button from "@mui/material/Button";
import LeftDrawer from "@/components/Drawer";


function App() {
    const [leftDrawerOpen, setLeftDrawerOpen] = React.useState(false);

    const toggleLeftDrawer = (open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }
        setLeftDrawerOpen(open);
    };

    return (
        <div style={{ display: 'flex' }}>
            <LeftDrawer
                variant="permanent"
                open={true}
            />
            <div style={{ flexGrow: 1, textAlign: "center", color: "green" }}>
                <h1>Alfix</h1>
                <h2>The Premier After Sales Arena</h2>
          
            </div>
        </div>
    );
}

export default App;