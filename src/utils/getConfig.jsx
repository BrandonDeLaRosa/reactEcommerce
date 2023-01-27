const getConfig = () => ({
// GET item: porque estoy trayendo los valores. 
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
});

export default getConfig;