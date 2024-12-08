export default function checkFilled(...inputs){

    let filled = true;

    inputs.forEach(input => {
        if(input.trim() == "")
            filled = false;
    })

    return filled;
}