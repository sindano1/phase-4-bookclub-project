class ReadsController < ApplicationController
    before_action :find_read, only: [:show, :update, :destroy]

    def index
        render json: Read.all
    end

    def show
     render json: @read
    end

    def create
        read = Read.create!(read_params)
        render json: read, status: :created
    end

    def update
        @read.update!(read_params)
        render json: @read, status: :accepted
    end
   
    def destroy
        @read.destroy
        head :no_content
   # double check this one -> render json: {}, status :accepted
    end
   
private
   
    def find_read
        @read = Read.find(params[:id])
    end
   
    def read_params
        params.permit(:user_id, :book_id, :has_been_read, :is_favorite, :review)
    end

    # return book instance:
    # book = self.book_id
    # Book.find_by(id: book_id)

    # return user instance
    # user = self.user_id
    # User.find_by(id: user_id)
end
