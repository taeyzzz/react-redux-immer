export default function(errorCode, objErrorHandler = {}, defaultFn = () => {}){
	const fn = objErrorHandler[errorCode]
	fn ? fn() : defaultFn()
}
