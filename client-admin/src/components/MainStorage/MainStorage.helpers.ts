import {Ratio, SubtypeOfRecycle} from "./MainStorage.types";

export const ratios: Ratio[] = [
    {name: 'All', value: '1'},
    {name: 'Metal', value: '2'},
    {name: 'Plastic', value: '3'},
    {name: 'Glass', value: '4'},
    {name: 'Paper', value: '5'},
    {name: 'Organic', value: '4'},
    {name: 'Battery', value: '5'}
]

export const metal: SubtypeOfRecycle[] = [
    {name: 'All', value: '1'},
    {name: 'Steel', value: '2'},
    {name: 'Aluminium', value: '3'}
]

export const plastic: SubtypeOfRecycle[] = [
    {name: 'All', value: '1'},
    {name: "Polyethylene terephthalate", value: '2'},
    {name: 'High density polyethylene', value: '3'},
    {name: 'PVC', value: '4'},
    {name: 'Polypropylene', value: '5'},
    {name: 'Polystyrene', value: '6'},
    {name: 'Other types of plastic', value: '7'},
    {name: 'ABS plastic', value: '8'},
]

export const glass: SubtypeOfRecycle[] = [
    {name: 'All', value: '1'},
    {name: 'Colorless glass', value: '2'},
    {name: 'Green Glass', value: '3'},
    {name: 'Brown glass', value: '4'},
    {name: 'Bottle glass dark brown', value: '5'},
    {name: 'Glass with low lead content', value: '6'},
    {name: 'Crystal', value: '7'},
    {name: 'Glass coated with copper', value: '8'},
    {name: 'Silver plated glass', value: '9'},
    {name: 'Gilded glass', value: '10'},
]

export const organic: SubtypeOfRecycle[] = [
    {name: 'All', value: '1'},
    {name: 'Wood', value: '2'},
    {name: 'Cork', value: '3'},
    {name: 'Cotton', value: '4'},
    {name: 'Jute fiber', value: '5'}
]

export const paper: SubtypeOfRecycle[] = [
    {name: 'All', value: '1'},
    {name: 'Corrugated cardboard', value: '2'},
    {name: 'Other cardboard', value: '3'},
    {name: 'Paper', value: '3'},
    {name: 'Wax paper', value: '3'},
]

export const battery: SubtypeOfRecycle[] = [
    {name: 'All', value: '1'},
    {name: 'Lead acid battery', value: '2'},
    {name: 'Alkaline element', value: '3'},
    {name: 'Nickel-cadmium battery', value: '4'},
    {name: 'Nickel metal hydride battery', value: '5'},
    {name: 'Lithium battery', value: '6'},
    {name: 'Silver-zinc accumulator', value: '7'},
    {name: 'Manganese-zinc element', value: '8'},
]
