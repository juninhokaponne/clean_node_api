import { HttpResponse, HttpRequest } from '../protocols/http'; 
import { MissingParamError } from '../errors/missing-param-error';
import { BadRequest } from '../helpers/http-helper';
import { Controller } from '../protocols/controller';
import { EmailValidator } from '../protocols/email-validator';
import { InvalidParamError } from '../errors/Invalid-param-error';

export class SignUpController implements Controller {
    private readonly emailValidator: EmailValidator

    constructor(emailValidator: EmailValidator){
        this.emailValidator = emailValidator
    }

    handle(httpRequest: HttpRequest): HttpResponse {
        const requiredFields = ['name', 'email', 'password', 'passwordConfirmation'];
        for(const field of requiredFields){
            if(!httpRequest.body[field]){
                return BadRequest(new MissingParamError(field))
            }
        }

        const isValid = this.emailValidator.isValid(httpRequest.body.email)
        if(!isValid){
            return BadRequest(new InvalidParamError('email'))
        }
    }
}