const composeError = (err: Error) => {
    switch(err.message){
        case "Network Error":
            return "Server není dostupný, prosím zkuste to později.";

        case "Request failed with status code 401":
            return "Špatné heslo."
    }

    return err.message;
}

export { composeError }