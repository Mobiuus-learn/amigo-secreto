export const encriptMatch = (id: number): string => {
	return `${process.env.DEFAULT_TOKEN}${id}${process.env.DEFAULT_TOKEN}`;
};

export const decriptedMatch = (match: string): number => {
	let idStr: string = match
		.replace(`${process.env.DEFAULT_TOKEN}`, "")
		.replace(`${process.env.DEFAULT_TOKEN}`, "");
	return parseInt(idStr);
};
