import { UserService } from "../services";
import {
  PaginationQueryDto,
  UserUpdateDto,
  UserUUIDParams,
  GeneratorQueryDto,
} from "../dto";
import {
  JsonController,
  QueryParams,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  OnUndefined,
  NotFoundError,
} from "routing-controllers";
import { UserDto } from "../dto";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";

@JsonController("/users")
export class UserController {
  constructor(private userService: UserService) {
    this.userService = new UserService();
  }

  @Get("/")
  @OpenAPI({ summary: "Return a list of users" })
  @ResponseSchema(UserDto, { isArray: true })
  getAll(@QueryParams() query: PaginationQueryDto) {
    return this.userService.getAllUsers(query);
  }

  @Get("/generate-list")
  @OpenAPI({
    summary:
      "Return a list of available users for a team and choose the speaker",
  })
  @ResponseSchema(UserDto, { isArray: true })
  generateList(@QueryParams() query: GeneratorQueryDto) {
    return this.userService.generateList(query);
  }

  @Get("/:userId")
  getOne(@Param("userId") params: UserUUIDParams) {
    return this.userService.getUser(params.userId);
  }

  @Post()
  post(@Body() user: UserDto) {
    return this.userService.createUser(user);
  }

  @Put("/:userId")
  @OnUndefined(404)
  put(@Param("userId") userId: string, @Body() user: UserUpdateDto) {
    return this.userService.updateUser(user, userId);
  }

  @Delete("/:userId")
  remove(@Param("userId") params: UserUUIDParams) {
    return this.userService.deleteUser(params.userId);
  }
}
