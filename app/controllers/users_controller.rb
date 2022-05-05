class UsersController < ApplicationController
before_action :find_user, only: [:show, :update, :destroy]

    def index
        render json: User.all
    end

    def show
        render json: @user
    end

    def create
        user = User.create!(user_params)
        render json: user, status: :created
    end

    def update
        @user.update!(user_params)
        render json: @user, status: :accepted
    end
   
    def destroy
        @user.destroy
        head :no_content
   # double check this one -> render json: {}, status :accepted
    end

private

    def find_user
        @user = User.find(params[:id])
    end

    def user_params
        params.permit(:username, :password, :first_name, :last_name, :birthday)
    #can a user assign their own default club id?
    end
end
