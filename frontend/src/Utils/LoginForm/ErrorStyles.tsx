export const addErrorStyles = (target: HTMLInputElement) => {
target.classList.add("ring-red-500");
target.classList.remove("focus:ring-base-h", "dark:ring-neutral-200");
if (target.previousElementSibling){
    target.previousElementSibling.classList.add("text-red-500")
}   
}

export const removeErrorStyles = (target: HTMLInputElement) => {
target.classList.remove("ring-red-500");
target.classList.add("focus:ring-base-h", "dark:ring-neutral-200");
if (target.previousElementSibling){
    target.previousElementSibling.classList.remove("text-red-500")
}    
}