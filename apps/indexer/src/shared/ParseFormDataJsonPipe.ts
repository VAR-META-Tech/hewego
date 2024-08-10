import {ArgumentMetadata, Injectable, PipeTransform} from '@nestjs/common';
import {deepParseJson} from 'deep-parse-json';
import * as _ from 'lodash';

type TParseFormDataJsonOptions = {
    except?: string[];
    arrayString?: string;
};

@Injectable()
export class ParseFormDataJsonPipe implements PipeTransform {
    constructor(private options?: TParseFormDataJsonOptions) {
    }

    transform(value: any, _metadata: ArgumentMetadata) {
        const {except, arrayString} = this.options;
        const serializedValue = value;
        const originProperties = {};
        if (except?.length) {
            _.merge(originProperties, _.pick(serializedValue, ...except));
        }
        if (arrayString) {
            let data = _.pick(serializedValue, arrayString);
            data = deepParseJson(data);
            if ((typeof data[arrayString]) == "string") {
                data[arrayString] = data[arrayString].split(',')
                _.merge(originProperties, data);
            }
        }
        const deserializedValue = deepParseJson(value);
        return {...deserializedValue, ...originProperties};
    }
}