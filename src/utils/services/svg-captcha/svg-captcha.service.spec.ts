import { Test, TestingModule } from '@nestjs/testing';
import { SvgCaptchaService } from './svg-captcha.service';

describe('SvgCaptchaService', () => {
    let service: SvgCaptchaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [SvgCaptchaService],
        }).compile();

        service = module.get<SvgCaptchaService>(SvgCaptchaService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
