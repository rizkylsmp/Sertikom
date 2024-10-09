import React from "react";
import Profil from "../assets/Profil.JPG";
import { IoIosMail } from "react-icons/io";
import { FaWhatsapp, FaLinkedin, FaGithub } from "react-icons/fa";

const About = () => {
  return (
    <div>
      <div className="font-bold text-3xl">About</div>
      <div className="mt-5 flex gap-8">
        <div>
          <img
            src={Profil}
            alt="Foto Profil"
            className="object-cover w-64 h-96 rounded-lg"
          />
        </div>
        <div className="text-lg flex flex-col gap-5">
          <div className="text-xl font-bold">Aplikasi ini dibuat oleh :</div>
          <div class="grid grid-cols-4 gap-3">
            <div class="font-semibold">Nama</div>
            <div className="text-end">:</div>
            <div className="col-span-2">Rizky Lanang Sadana Mulyono Putra</div>

            <div class="font-semibold">Program Studi</div>
            <div className="text-end">:</div>
            <div class="col-span-2">D3 - Teknologi Informasi</div>

            <div class="font-semibold">NIM</div>
            <div className="text-end">:</div>
            <div class="col-span-2">2131740022</div>

            <div class="font-semibold">Tanggal</div>
            <div className="text-end">:</div>
            <div class="col-span-2">13 Juli 2024</div>
          </div>
          <div className="flex justify-between px-44 items-center gap-2">
            <a
              href="mailto:rizkylsmp@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-black text-white px-2 py-2 hover:shadow-[-1px_-1px_5px_rgba(255,_255,_255,_0.6),_1px_1px_5px_rgba(0,_0,_0,_0.3),inset_-2px_-2px_5px_rgba(255,_255,_255,_1),inset_2px_2px_4px_rgba(0,_0,_0,_0.3)]"
            >
              <IoIosMail />
            </a>
            <a
              href="https://wa.link/379fob"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-black text-white px-2 py-2 hover:shadow-[-1px_-1px_5px_rgba(255,_255,_255,_0.6),_1px_1px_5px_rgba(0,_0,_0,_0.3),inset_-2px_-2px_5px_rgba(255,_255,_255,_1),inset_2px_2px_4px_rgba(0,_0,_0,_0.3)]"
            >
              <FaWhatsapp />
            </a>
            <a
              href="https://www.linkedin.com/in/rizkylsmp/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-black text-white px-2 py-2 hover:shadow-[-1px_-1px_5px_rgba(255,_255,_255,_0.6),_1px_1px_5px_rgba(0,_0,_0,_0.3),inset_-2px_-2px_5px_rgba(255,_255,_255,_1),inset_2px_2px_4px_rgba(0,_0,_0,_0.3)]"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com/rizkylsmp"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-black text-white px-2 py-2 hover:shadow-[-1px_-1px_5px_rgba(255,_255,_255,_0.6),_1px_1px_5px_rgba(0,_0,_0,_0.3),inset_-2px_-2px_5px_rgba(255,_255,_255,_1),inset_2px_2px_4px_rgba(0,_0,_0,_0.3)]"
            >
              <FaGithub />
            </a>
          </div>
          <div className="text-center bg-color-2 bg-opacity-10 rounded-lg mx-40 py-3">
            <img
              src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=18&pause=500&color=0A21C0&center=true&width=400&lines=%E2%80%9CWe%E2%80%99re+Born+Free.%E2%80%9D"
              alt="Quote"
            />
            <div className="font-serif text-[16px]">- Eren Yeager</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
