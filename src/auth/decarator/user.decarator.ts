import {createParamDecorator, ExecutionContext} from "@nestjs/common";

export const GetUser = createParamDecorator(
    (key: string, ctx: ExecutionContext) => {
        const request: Express.Request = ctx.switchToHttp().getRequest();
        let user = request.user;
        return key ? user?.[key] : user
    },
);