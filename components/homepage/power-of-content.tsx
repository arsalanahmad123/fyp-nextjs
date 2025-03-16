import { ArrowRight, Check } from 'lucide-react';
import Image from 'next/image';
import React from 'react'
import { Button } from '../ui/button';
import QuoteSection from './quote-section';

export const PowerOfContent = () => {
  return (
      <div className="min-h-[100svh] bg-gradient-to-r from-[#DBF1C3] to-[#DCE7E3] rounded-tl-[40px] rounded-tr-[40px] flex flex-col  items-center md:pt-28 pt-16 gap-5 px-5 md:px-0">
          <h6 className="md:text-[20px] text-sm font-bold text-theme text-center">
              Descripto HELP YOU TO GENERATE COTENT FAST
          </h6>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-2 text-theme2">
              Power of an AI content
          </h2>
          <div className="max-w-7xl mx-auto flex flex-col gap-7 mt-4">
              <div className="bg-white w-full p-7 md:p-20 grid grid-cols-1 md:grid-cols-2 rounded-3xl gap-5 md:gap-10">
                  <Image
                      src={'/power-1.svg'}
                      alt="Power-1"
                      width={400}
                      height={400}
                      className="w-100"
                  />
                  <div className="flex flex-col gap-5">
                      <h5 className="text-2xl md:text-4xl lg:text-[42px] font-bold mt-2 text-theme2">
                          The following ideas are inspired by your brand.
                      </h5>
                      <span className="text-muted-foreground text-sm">
                          Got writer&apos;s block? Get ideas for stories, blog
                          posts, website copy, research topics and more.
                      </span>
                      <div className="flex flex-col gap-3 mt-5">
                          <span className="flex gap-2 items-center text-sm">
                              <Check
                                  className="text-theme"
                                  size={20}
                                  strokeWidth={3}
                              />
                              <span className="font-bold tex-theme2">
                                  Save time rapid AI-driven generation
                              </span>
                          </span>
                          <span className="flex gap-2 items-center text-sm">
                              <Check
                                  className="text-theme"
                                  size={20}
                                  strokeWidth={3}
                              />
                              <span className="font-bold tex-theme2">
                                  No outdates continuous code document
                              </span>
                          </span>
                      </div>
                      <Button className="cursor-pointer font-semibold hover:bg-theme transition-colors duration-200 ease-in max-w-fit mt-3 py-6 px-10 text-[16px]">
                          Sign up for free <ArrowRight />
                      </Button>
                  </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-7">
                  <div className="bg-white rounded-3xl flex flex-col gap-4 md:p-10 p-5">
                      <Image
                          src={'/power-2.svg'}
                          alt="Power-2"
                          className="w-full"
                          height={200}
                          width={200}
                      />
                      <h5 className="text-2xl md:text-[28px] font-semibold mt-2 text-theme2">
                          Write higher converting assistance post for all latest
                          user
                      </h5>
                      <span className="text-muted-foreground text-sm">
                          Got writer&apos;s block? Get ideas for stories, blog
                          posts, website copy, research topics and more.
                      </span>
                      <Button
                          variant={'outline'}
                          className="cursor-pointer font-semibold hover:bg-theme transition-colors duration-300 ease-in max-w-fit mt-3 py-6 px-10 shadow-none hover:text-white text-[16px]"
                      >
                          Sign up for free <ArrowRight />
                      </Button>
                  </div>
                  <div className="bg-white rounded-3xl flex flex-col gap-4 md:p-10 p-5">
                      <Image
                          src={'/power-3.svg'}
                          alt="Power-3"
                          className="w-full"
                          height={200}
                          width={200}
                      />
                      <h5 className="text-2xl md:text-[28px] font-semibold mt-2 text-theme2">
                          Generate blog posts, stories & even book with Met.ai
                      </h5>
                      <span className="text-muted-foreground text-sm">
                          Got writer&apos;s block? Get ideas for stories, blog
                          posts, website copy, research topics and more.
                      </span>
                      <Button
                          variant={'outline'}
                          className="cursor-pointer font-semibold hover:bg-theme transition-colors duration-300 ease-in max-w-fit mt-3 py-6 px-10 shadow-none hover:text-white text-[16px]"
                      >
                          Sign up for free <ArrowRight />
                      </Button>
                  </div>
              </div>
          </div>
          <QuoteSection />
      </div>
  );
}
