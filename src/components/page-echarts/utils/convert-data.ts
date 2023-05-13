import { coordinateData } from './coordinate-data'

//将 城市数据和城市经纬度拼接，拼接成类似:
//{}
export const convertData = function (data: any) {
  const res = []
  for (let i = 0; i < data.length; i++) {
    const geoCoord = coordinateData[data[i].name]
    if (geoCoord) {
      res.push({
        name: data[i].name,
        value: geoCoord.concat(data[i].value)
      })
    }
  }
  console.log(res)

  return res
}
