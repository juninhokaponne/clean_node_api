import { SignUpController } from './signup';
import { MissingParamError } from '../errors/missing-param-error';
import { InvalidParamError } from '../errors/Invalid-param-error';
import { EmailValidator } from '../protocols/email-validator';

interface SutTypes {
    sut: SignUpController
    emailValidatiorStub: EmailValidator
}

const makeSut = (): SutTypes => {
    class EmailValidatorStub implements EmailValidator{
        isValid(email: string): boolean {
            return true 
        }
    }

    const emailValidatiorStub = new EmailValidatorStub()
    const sut = new SignUpController(emailValidatiorStub)
    
    return {
        sut, 
        emailValidatiorStub
    }
}

describe('SignUp Controller', () => {
    test('Should return statusCode 400 if no name is provided', () => {
        const { sut } = makeSut()
        const httpRequest = {
            body: {
                email: 'any_emai@hotmai.com',
                password: 'any_password',
                passwordConfirmation: 'any_password'
            }
        }

        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('name'))
    })

    test('Should return statusCode 400 if no email is provided',() => {
        const { sut } = makeSut()
        const httpRequest = {
            body: {
                name: 'any_name',
                password: 'any_password',
                passwordConfirmation: 'any_password'
            }
        }

        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('email'))
    })

    test('Should return statusCode 400 if no password is provided',() => {
        const { sut } = makeSut()
        const httpRequest = {
            body: {
                name: 'any_name',
                email: 'any_emai@hotmai.com',
                passwordConfirmation: 'any_password'
            }
        }

        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('password'))
    })

    test('Should return statusCode 400 if no password confirmation is provided',() => {
        const { sut } = makeSut()
        const httpRequest = {
            body: {
                name: 'any_name',
                email: 'any_emai@hotmai.com',
                password: 'any_password'
            }
        }
    
        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('passwordConfirmation'))
})
    
    test('Should return statusCode 400 if an invalid email is provided',() => {
        const { sut, emailValidatiorStub } = makeSut()
        jest.spyOn(emailValidatiorStub, 'isValid').mockReturnValueOnce(false)
        
        const httpRequest = {
            body: {
                name: 'any_name',
                email: 'invalid_emai@hotmai.com',
                password: 'any_password',
                passwordConfirmation: 'any_password-confirmation'
            }
        }
    
        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new InvalidParamError('email'))
    })

})

