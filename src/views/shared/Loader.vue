<template>
  <div class="flex flex-col mt-2">
    <div
      class="
        -my-2
        py-2
        overflow-x-auto
        sm:-mx-6 sm:px-6
        lg:-mx-8 lg:pl-8 lg:pr-6
      "
    >
      <div
        class="
          align-middle
          inline-block
          min-w-full
          shadow
          overflow-hidden
          sm:rounded-lg
          border-b border-gray-200
        "
      >
        <table class="min-w-full" id="subsTable">
          <tbody class="bg-white" v-for="n in 4" :key="n">
            <tr class="hover:bg-gray-50 cursor-pointer">
              <td
                class="
                  px-2
                  pl-6
                  py-2
                  whitespace-no-wrap
                  border-b border-gray-200
                "
              >
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <!-- subscription logo skeleton start -->
                    <div class="animate-pulse flex space-x-4">
                      <div class="h-10 w-10 rounded-full bg-gray-300"></div>
                    </div>
                    <!-- subscription logo skeleton end -->
                  </div>
                  <!-- product name skeleton starts -->
                  <div class="ml-4">
                    <div class="animate-pulse text-gray-500 px-2 py-1">
                      <div class="flex-1 space-y-4 py-1">
                        <div class="h-4 bg-gray-300 rounded w-52"></div>
                      </div>
                    </div>
                  </div>
                  <!-- product name skeleton ends -->
                </div>
              </td>
              <td
                class="
                  text-xs
                  px-2
                  py-2
                  whitespace-no-wrap
                  border-b border-gray-200
                "
              >
                <!-- subs purchased date skeleton starts -->
                <div class="animate-pulse text-gray-500 px-2 pl-4 py-1">
                  <div class="flex-1 space-y-4 py-1">
                    <div class="h-4 bg-gray-300 rounded w-28"></div>
                  </div>
                </div>
                <!-- subs purchased date skeleton ends -->
              </td>
              <td
                class="
                  pl-12
                  px-2
                  py-2
                  whitespace-no-wrap
                  border-b border-gray-200
                "
              >
                <!-- subs status skeleton starts -->
                <div class="animate-pulse text-gray-500 px-2 py-1">
                  <div class="flex-1 space-y-4 py-1">
                    <div class="h-4 bg-gray-300 rounded w-24"></div>
                  </div>
                </div>
                <!-- subs status skeleton ends -->
              </td>

              <td
                class="
                  pl-4
                  px-2
                  py-2
                  whitespace-no-wrap
                  border-b border-gray-200
                "
              >
                <!--Code Block for gray tooltip ends-->
              </td>

              <td class="px-2 py-2 whitespace-no-wrap border-b border-gray-200">
                <div
                  class="
                    text-xs
                    leading-5
                    font-semibold
                    text-gray-500 text-center
                  "
                >
                  <span class="inline-flex">
                    <div class="flex-shrink-0 h-10 w-10">
                      <!-- subscription logo skeleton start -->
                      <div class="animate-pulse flex space-x-4">
                        <div class="h-10 w-10 rounded-full bg-gray-300"></div>
                      </div>
                      <!-- subscription logo skeleton end -->
                    </div>
                  </span>
                </div>
              </td>

              <td
                class="
                  pl-4
                  px-2
                  py-2
                  whitespace-no-wrap
                  border-b border-gray-200
                "
              >
                <!-- subs date skeleton starts -->
                <div class="animate-pulse text-gray-500 px-2 py-1">
                  <div class="flex-1 space-y-4 py-1">
                    <div class="h-4 bg-gray-300 rounded w-24"></div>
                  </div>
                </div>
                <!-- subs date skeleton ends -->
              </td>

              <td
                class="
                  font-bold
                  pl-8
                  px-6
                  py-2
                  whitespace-no-wrap
                  border-b border-gray-200
                  text-base
                  font-medium
                  leading-5
                  text-gray-700
                "
              >
                <!-- subs price skeleton starts -->
                <div class="animate-pulse text-gray-500 px-2 py-1">
                  <div class="flex-1 space-y-4 py-1">
                    <div class="h-4 bg-gray-300 rounded w-20"></div>
                  </div>
                </div>
                <!-- subs price skeleton ends -->
              </td>

              <td
                class="
                  pr-4
                  px-2
                  py-2
                  whitespace-no-wrap
                  text-right
                  border-b border-gray-200
                  text-sm
                  leading-5
                  font-medium
                "
              >
                <span class="inline-flex">
                  <!-- duplicate subscription skeleton starts -->
                  <div class="animate-pulse text-gray-500 px-2 py-1">
                    <div class="flex-1 space-y-4 py-1">
                      <div class="h-4 bg-gray-300 rounded w-6"></div>
                    </div>
                  </div>

                  <!-- duplicate subscription skeleton starts -->

                  <!-- edit subscription skeleton starts -->
                  <div class="animate-pulse text-gray-500 px-2 py-1">
                    <div class="flex-1 space-y-4 py-1">
                      <div class="h-4 bg-gray-300 rounded w-6"></div>
                    </div>
                  </div>

                  <!-- edit subscription skeleton starts -->

                  <!-- edit subscription -->
                  <div class="animate-pulse text-gray-500 px-2 py-1">
                    <div class="flex-1 space-y-4 py-1">
                      <div class="h-4 bg-gray-300 rounded w-6"></div>
                    </div>
                  </div>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SubsLoader",
};
</script>
