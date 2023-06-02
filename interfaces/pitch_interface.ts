import { Types } from 'mongoose';

interface IPitch {
    name: String
    description: String
    price: String
    location: any,
    groundType: String
    pitchSetting: String
    playersNumber: Number
    availabletyList: Types.Array<IPeriod>,
    pitchPic: any
}