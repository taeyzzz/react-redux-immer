import React from 'react'
import SkeletonLoading from '../../components/SkeletonLoading/Loadable'
import { fetchImageBase64 } from '../../utils'

const withScreenshotBase64 = (WrappedComponent) => {
	class HOC extends React.Component{
		constructor(props){
			super(props)
			this.state = {
				base64Image: undefined,
				isLoading: true
			}
		}

		componentDidMount(){
			this.prepareImageSrc()
		}

		async prepareImageSrc(){
			try{
  			if(this.props.imgSrc){
  				const base64Image = await fetchImageBase64(this.props.imgSrc)
  				this.setState({
						base64Image
					})
  			}
  		}
  		catch(error){
				this.setState({
					base64Image: undefined
				})
				this.props.onLinkImageInvalid && this.props.onLinkImageInvalid()				
  		}
			finally{
				this.setState({
					isLoading: false
				})
			}
		}

		render(){
			if(this.state.isLoading){
				return (
					<SkeletonLoading />
				)
			}
			else {
				return (
					<WrappedComponent
						{...this.props}
						imgSrc={this.state.base64Image}
					/>
				)
			}
		}
	}
	return HOC
}

export default withScreenshotBase64
