import {ArgumentMetadata, BadRequestException, Injectable, PipeTransform} from '@nestjs/common'

@Injectable()
export class TrimPipe implements PipeTransform {
    transform(values: any, metadata: ArgumentMetadata) {
        const {type} = metadata;
        if (this.isObj(values) && type === 'body') {
            return this.trim(values)
        }

        return values;
    }

    private isObj(obj: any): boolean {
        return typeof obj === 'object' && obj !== null
    }

    private trim(values) {
        Object.keys(values).forEach(key => {
            if (key !== 'password') {
                if (this.isObj(values[key])) {
                    values[key] = this.trim(values[key])
                } else {
                    if (typeof values[key] === 'string') {
                        const valueTrim = values[key].trim();

                        if (values[key].trim().length > 0 || values[key].length == 0) {
                            values[key] = valueTrim;
                        } else {
                            throw new BadRequestException([key.charAt(0).toUpperCase() + key?.slice(1) + ' should not be empty'])
                        }
                    }
                }
            }
        })
        return values
    }
}