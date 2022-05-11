class ClubBooksController < ApplicationController
    before_action :find_club_book, only: [:show, :update, :destroy]
    def index
        render json: ClubBook.all
    end

    def show
        render json: @club_book
    end

    def create
        club_book = ClubBook.create!(club_book_params)
        render json: club_book, status: :created
    end

    def update
        @club_book.update!(club_book_params)
        render json: @club_book, status: :accepted
    end

    def destroy
     @club_book.destroy
     head :no_content
    # double check this one -> render json: {}, status :accepted
    end

private

    def find_club_book
        @club_book = ClubBook.find(params[:id])
    end

    def club_book_params
        params.permit(:club_id, :book_id)
    end
end
