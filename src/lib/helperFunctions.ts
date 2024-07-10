export async function chill(duration: number) {
	return new Promise((resolve) => {
		setTimeout(resolve, duration);
	});
}
