import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Box } from "@mui/material"

import { Videos, ChannelCard } from "./"
import { fetchFromAPI } from "../utils/fetchFromAPI"

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState(null)
  const [videos, setVideos] = useState([])
  
  const { id } = useParams();

  useEffect(() => {
    fetchFromAPI(`channels?part=snippet&id=${id}`) 
      .then((data) => setChannelDetail(data?.items[0]))
    
    fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`) 
      .then((data) => setVideos(data?.items))
  }, [id])

  return (
    <Box minHeight="95vh">
      <Box>
        <div
          style={{
            backgroundColor: '#FF3CAC',
            backgroundImage: 'linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%)',
            height: '300px'
          }}
        />
        <ChannelCard channelDetail={channelDetail} marginTop='-110px' />
      </Box>
      <Box dispay='flex' p='2'>
        <Box sx={{mr: { sm: '100px' }}} />
        <Videos videos={videos}/>
      </Box>
    </Box>
  )
}

export default ChannelDetail;