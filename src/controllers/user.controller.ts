import { NextFunction, Request, Response } from "express";
import { T } from "../libs/types/common";
import MemberService from "../models/Member.service";
import { ExtendedRequest, LoginInput, Member, MemberInput, MemberUpdateInput } from "../libs/types/member";
import Errors, { HttpCode, Message } from "../libs/Errors";
import AuthService from "../models/Auth.service";
import { AUTH_TIMER } from "../libs/config";

// React Project

const memberService = new MemberService();
const authService = new AuthService();

const userController: T = {};
userController.signup = async (req: Request, res: Response) => {
    try {
        console.log("Signup");
        const input: MemberInput = req.body;
        if (req.file) input.memberImage = req.file.path;
        const result: Member = await memberService.signup(input);
        const token = await authService.createToken(result);

        res.cookie("accessToken", token, {
            maxAge: AUTH_TIMER * 3600 * 1000,
            httpOnly: false,
        });

        res.status(HttpCode.CREATED).json({ member: result, accessToken: token });
    } catch (err) {
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standard.code).json(Errors.standard);
        console.log("Error, signup:", err);
    }
};

userController.login = async (req: Request, res: Response) => {
    try {
        console.log("login");
        const input: LoginInput = req.body,
            result = await memberService.login(input),
            token = await authService.createToken(result);

        res.cookie("accessToken", token, {
            maxAge: AUTH_TIMER * 3600 * 1000,
            httpOnly: false,
        });

        res.status(HttpCode.OK).json({ member: result, accessToken: token });
    } catch (err) {
        console.log("Error, login:", err);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standard.code).json(Errors.standard);
    }
};

userController.logout = (req: ExtendedRequest, res: Response) => {
    try {
        console.log("logout");
        res.cookie("accessToken", null, { maxAge: 0, httpOnly: true });
        res.status(HttpCode.OK).json({ logout: true });

    } catch (err) {
        console.log("Error, logout:", err);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standard.code).json(Errors.standard);
    }
};

userController.getOwner = async (req: Request, res: Response) => {
    try {
        console.log("getRestaurant");
        const result = await memberService.getOwner();

        res.status(HttpCode.OK).json(result);
    } catch (err) {
        console.log("Error, logout:", err);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standard.code).json(Errors.standard);
    }
}

userController.getUserDetail = async (req: ExtendedRequest, res: Response) => {
    try {
        console.log("getUserDetail");
        const result = await memberService.getUserDetail(req.member);

        res.status(HttpCode.OK).json(result);
    } catch (err) {
        console.log("Error, getUserDetail:", err);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standard.code).json(Errors.standard);
    }
};

userController.updateUser = async (req: ExtendedRequest, res: Response) => {
    try {
        console.log("updateUser");
        const input: MemberUpdateInput = req.body;
        if (req.file) input.memberImage = req.file.path;
        const result = await memberService.updateUser(req.member, input);

        res.status(HttpCode.OK).json(result);
    } catch (err) {
        console.log("Error, updateUser:", err);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standard.code).json(Errors.standard);
    }


}

userController.getTopUsers = async (req: Request, res: Response) => {
    try {
        console.log("getTopUsers");

        const result = await memberService.getTopUsers();

        res.status(HttpCode.OK).json(result);

    } catch (err) {
        console.log("Error, getTopUsers:", err);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standard.code).json(Errors.standard);
    }
}



userController.verifyAuth = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies["accessToken"];
        if (token) req.member = await authService.checkAuth(token);
        if (!req.member)
            throw new Errors(HttpCode.UNAUTHORIZED, Message.NOT_AUTHENTICATED);

        next();
    } catch (err) {
        console.log("Error, verfyAuth:", err);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standard.code).json(Errors.standard);
    }
};

userController.retrieveAuth = async (
    req: ExtendedRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.cookies["accessToken"];
        if (token) req.member = await authService.checkAuth(token);

        next();
    } catch (err) {
        console.log("Error, retrieveAuth:", err);
        next();
    }
};


export default userController;
