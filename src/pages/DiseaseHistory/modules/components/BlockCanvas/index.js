import { Grid, GridItem } from '@chakra-ui/react'
import React, { memo } from 'react'
import Canvas from './Canvas'

function BlockCanvas() {

    return (
        <Grid
            templateRows='repeat(2, 1fr)'
            templateColumns='repeat(5, 1fr)'
            gap={4}
            borderRadius='10px'
        >
            <GridItem borderRadius='10px' rowSpan={2} colSpan={[5, 5, 5, 3]} >

                <Canvas imageName='deseaseImage1'/>

            </GridItem>


            <GridItem borderRadius='10px' colSpan={[5, 5, 5, 2]} >

                <Canvas imageName='deseaseImage2'/>

            </GridItem>

            <GridItem borderRadius='10px' colSpan={[5, 5, 5, 2]}>

                <Canvas imageName='deseaseImage3'/>

            </GridItem>

        </Grid>

    )
}

export default memo(BlockCanvas)