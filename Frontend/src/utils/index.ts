export const daysLeft = (deadline: number) => {
    const deadlineMs = deadline * 1000; // Convert from seconds to milliseconds
    const difference = deadlineMs - Date.now();
    const remainingDays = Math.ceil(difference / (1000 * 3600 * 24));
    return remainingDays > 0 ? remainingDays : 0;
};

export const calculateBarPercentage = (goal: number, raisedAmount: number) => {
    const percentage = Math.round((raisedAmount * 100) / goal);

    return percentage;
};

export const checkIfImage = (url: string, callback: (isNotError: boolean) => void) => {
    const img = new Image();
    img.src = url;

   // if (img.complete) callback(true);

    img.onload = () => callback(true);
    img.onerror = () => callback(false);
};

